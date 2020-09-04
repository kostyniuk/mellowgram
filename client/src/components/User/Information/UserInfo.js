import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  setFollowedBy,
  setFollowing,
  deleteFollow,
  addFollow,
  addInterests,
  resetUnreadCounter,
} from '../../../redux/actions';

import useFetch from '../../../hooks/useFetch';

import equal from 'deep-equal';

import { ToastContainer, toast } from 'react-toastify';

import ToastNewMsg from '../ToastNewMsg';
import PicturesBar from '../Sides/PicturesBar';
import PictureModal from '../PictureModal';
import EditModal from '../EditModal';

import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/user.css';
import '../../../styles/btn.css';
import LikesModal from '../Post/LikesModal';
import InterestBar from '../Sides/InterestBar';
import Badge from '../../Direct/Badge';
import LoginModal from './LoginModal';

const UserInfo = ({ startMessagingHandler, setOpenDialog }) => {
  const history = useHistory();

  const { request } = useFetch();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const followingLoggedIn = useSelector((state) => state.loggedInFollows);
  const following = useSelector((state) => state.following);
  const followedBy = useSelector((state) => state.followedBy);

  const [newMsg, setNewMsg] = useState({});
  const [selectedImg, setSelectedImg] = useState(null);
  const [followingThisUser, setFollowingThisUser] = useState(false);
  const [editBioModal, setEditBioModal] = useState(false);

  const [followModal, setFollowModal] = useState(null);

  const [loginModal, setLoginModal] = useState(false);

  const showNotify = useRef(false);
  let same = useRef(true);

  let btnClassName = 'green';

  const info = useSelector(
    (state) => state.currentPage,
    (prev, curr) => {
      same.current = equal(prev, curr);
      return equal(prev, curr);
    }
  );

  console.log({ newMsg });

  const chats = Object.values(
    useSelector(
      (state) => state.chats,
      (prev, curr) => {
        const prevChats = Object.values(prev);
        const currChats = Object.values(curr);
        prevChats.map((chat, i) => {
          if (!equal(chat, currChats[i])) {
            setNewMsg({
              username: chat.username,
              picture: chat.picture,
              context: chat.latestMessage.context,
              chatId: chat.room_id,
            });
            showNotify.current = false;
          }
        });
        return equal(prev.id, curr.id);
      }
    )
  );

  const isAlreadyFollowed = (id) => {
    const { users } = followingLoggedIn;
    const ids = users.map((userObj) => userObj.person_id);
    return setFollowingThisUser(ids.includes(id));
  };

  useEffect(() => {
    if (followingLoggedIn.user) {
      isAlreadyFollowed(info.id);
    }
  }, [followingLoggedIn]);

  const fetchFollowers = useCallback(
    async (info, signal) => {
      const responce = await request(
        `/api/follow/followers/${info.username}`,
        {},
        signal
      );
      if (responce.success) {
        dispatch(setFollowedBy({ users: responce.data, user: info.username }));
      }
    },
    [dispatch, setFollowedBy, request]
  );

  const fetchFollowing = useCallback(
    async (info, signal) => {
      const responce = await request(
        `/api/follow/following/${info.username}`,
        {},
        signal
      );
      if (responce.success) {
        dispatch(setFollowing({ users: responce.data, user: info.username }));
      }
    },
    [request, dispatch, setFollowing]
  );

  const fetchInterests = useCallback(
    async (info, signal) => {
      const responce = await request(
        `/api/interest/${info.username}`,
        {},
        signal
      );
      if (responce.success) {
        dispatch(addInterests({ interests: responce.interests }));
      }
    },
    [request, dispatch]
  );

  const followHandler = async () => {
    if (!loggedInUser.isAuthenticated) return setLoginModal(true);

    if (followingThisUser) {
      const responce = await request(`/api/follow/${info.id}`, {
        method: 'DELETE',
      });
      if (responce.success) {
        dispatch(
          deleteFollow({
            producer: {
              id: loggedInUser.id,
              username: loggedInUser.username,
              picture: loggedInUser.picture,
            },
            consumer: {
              id: info.id,
              picture: info.picture,
              username: info.username,
            },
            myPage: loggedInUser.id === info.id,
          })
        );
        setFollowing((prev) => !prev);
      }
    } else {
      const responce = await request(`/api/follow/${info.id}`, {
        method: 'POST',
      });
      if (responce.success) {
        dispatch(
          addFollow({
            producer: {
              id: loggedInUser.id,
              username: loggedInUser.username,
              picture: loggedInUser.picture,
            },
            consumer: {
              id: info.id,
              picture: info.picture,
              username: info.username,
            },
            myPage: loggedInUser.id === info.id,
          })
        );
        setFollowingThisUser((prev) => !prev);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (info.id && !same.current) {
      fetchFollowers(info, signal);
      fetchFollowing(info, signal);
      fetchInterests(info, signal);
    }

    return () => {
      abortController.abort();
    };
  }, [info.id]);

  const [btnAbout, setBtnAbout] = useState('is-active');
  const [btnContact, setBtnContact] = useState('');
  const [cardClasses, setCardClasses] = useState('card');
  const [sectionAbout, setSectionAbout] = useState('card-section is-active');
  const [sectionContact, setSectionContact] = useState('card-section');
  const [dataState, setDataState] = useState('#about');

  const handleButtonClick = (e) => {
    const targetSection = e.target.getAttribute('data-section');
    if (targetSection !== '#about') {
      setCardClasses((prev) => (prev += ' is-active'));
    } else {
      setCardClasses((prev) => {
        return prev.replace(/is-active/g, ' ');
      });
    }
    setDataState(targetSection);
    setSectionAbout('card-section');
    setSectionContact('card-section');
    setBtnAbout('');
    setBtnContact('');
    if (targetSection === '#experience') {
      // setSectionExperience((prev) => (prev += ' is-active'));
      // setBtnExprerience('is-active');
    } else if (targetSection === '#about') {
      setSectionAbout((prev) => (prev += ' is-active'));
      setBtnAbout('is-active');
    } else {
      setSectionContact((prev) => (prev += ' is-active'));
      setBtnContact('is-active');
    }
  };

  const handleEditClick = () => {
    setEditBioModal(true);
  };

  const notifyNewMessage = (msgInfo) => {
    console.log('hree');

    showNotify.current = true;
    toast.dark(
      <ToastNewMsg
        username={msgInfo.username}
        context={msgInfo.context}
        picture={msgInfo.picture}
      />,
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClick: () => history.push('/direct'),
      }
    );
    setOpenDialog(msgInfo.chatId);
  };

  const showFollow = (type) => {
    const obj = {};
    obj.title = type.charAt(0).toUpperCase() + type.slice(1);

    if (type === 'following') {
      setFollowModal({ ...obj, data: following.users });
    } else if (type === 'followers') {
      setFollowModal({ ...obj, data: followedBy.users });
    }
  };

  if (followingThisUser) btnClassName += ' LIKESMODAL_BTN_followed';

  if (!info) return <div></div>;

  if (
    !followedBy.user ||
    followedBy.user !== info.username ||
    !following.user ||
    following.user !== info.username
  )
    return <div></div>;

  return (
    <div>
      <div className='USER_INFO__container'>
        <InterestBar />
        {/* <FollowingBar followedBy={followedBy} following={following} /> */}
        <div className='USER_INFO_CENTER'>
          {loggedInUser.id !== info.id && (
            <div className='USER_INFO_CENTER_TOP'>
              <button className={btnClassName} onClick={followHandler}>
                {followingThisUser ? 'Following' : 'Follow'}
              </button>
              <button
                className='green USER_INFO_MESSAGE'
                onClick={() => {
                  if (!loggedInUser.isAuthenticated) return setLoginModal(true);
                  startMessagingHandler({ me: loggedInUser, other: info });
                  history.push('/direct');
                }}
              >
                Message
              </button>
            </div>
          )}
          <div className={cardClasses} data-state={dataState}>
            <div className='card-header'>
              <div className='card-cover'></div>
              <img className='card-avatar' src={info.picture} alt='avatar' />
              <h1 className='card-fullname'>{info.fullname}</h1>
              <h2 className='card-jobtitle'>{info.occupation}</h2>
            </div>
            <div className='card-main'>
              <div className={sectionAbout} id='about'>
                <div className='card-content'>
                  <div className='card-subtitle'>
                    <p>ABOUT</p>
                    {loggedInUser.id === info.id && (
                      <i className='fa fa-edit' onClick={handleEditClick}></i>
                    )}
                  </div>
                  <div className='card-desc'>
                    <p>
                      {info.bio || "The user hasn't provided bio information"}
                    </p>
                  </div>
                </div>
              </div>
              <div className={sectionContact} id='contact'>
                <div className='card-content'>
                  <div className='card-subtitle'>CONTACT</div>
                  <div className='card-contact-wrapper'>
                    <div className='card-contact'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' />
                        <circle cx='12' cy='10' r='3' />
                      </svg>
                      {info.based_in || 'Not provided'}
                    </div>
                    <div className='card-contact card-contact-center'>
                      <svg
                        className='svg-middle'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z' />
                      </svg>
                      {info.phone_number || 'Not provided'}
                    </div>
                    <div className='card-contact'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                        <path d='M22 6l-10 7L2 6' />
                      </svg>
                      {info.email}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className='card-buttons'>
                <button
                  data-section='#about'
                  className={btnAbout}
                  onClick={handleButtonClick}
                >
                  ABOUT
                </button>
                <button
                  className={btnContact}
                  data-section='#contact'
                  onClick={handleButtonClick}
                >
                  CONTACT
                </button>
              </div>
            </div>
          </div>
          <div className='user_info_bottom'>
            <div className='user_info_bottom_followers'>
              <button
                className='green follow'
                onClick={() => showFollow('followers')}
              >
                Followers
              </button>
              <Badge
                size='smaller'
                content={followedBy.users.length}
                status='default'
              />
            </div>
            <div className='user_info_bottom_followers'>
              <button
                className='green follow'
                onClick={() => showFollow('following')}
              >
                Following
              </button>
              <Badge
                size='smaller'
                content={following.users.length}
                status='default'
              />
            </div>
          </div>
        </div>
        <PicturesBar setSelectedImg={setSelectedImg} />
        {loginModal && <LoginModal closeHandler={setLoginModal} />}
        {selectedImg && (
          <PictureModal
            selectedImg={selectedImg}
            setSelectedImg={setSelectedImg}
          />
        )}
        {followModal && (
          <LikesModal
            info={followModal}
            closeHandler={setFollowModal}
            title={followModal.title}
          />
        )}
        {editBioModal && (
          <EditModal
            handleEdit={setEditBioModal}
            info={info.bio}
            isBio={true}
          />
        )}
        {Object.keys(newMsg).length && !showNotify.current
          ? notifyNewMessage(newMsg)
          : null}
      </div>
      <div>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          newestOnTop
          closeOnClick
          rtl={false}
        />
      </div>
    </div>
  );
};

export default UserInfo;
