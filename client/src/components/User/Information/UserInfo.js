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
import Exprerience from './Experience';
import PicturesBar from '../Sides/PicturesBar';
import PictureModal from '../PictureModal';
import EditModal from '../EditModal';

import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/user.css';
import '../../../styles/btn.css';
import LikesModal from '../Post/LikesModal';
import InterestBar from '../Sides/InterestBar';
import Badge from '../../Direct/Badge';

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

  const experience = [
    {
      id: 1,
      year: 2021,
      company: 'Spotify',
      profession: 'JS Developer',
      achievements: 'Developed new versions',
    },
    {
      id: 2,
      year: 2022,
      company: 'Spotify',
      profession: 'JS Developer',
      achievements: 'New products',
    },
    {
      id: 3,
      year: 2023,
      company: 'Spotify',
      profession: 'JS Developer',
      achievements: 'New app',
    },
  ];

  const [btnAbout, setBtnAbout] = useState('is-active');
  const [btnExprerience, setBtnExprerience] = useState('');
  const [btnContact, setBtnContact] = useState('');
  const [cardClasses, setCardClasses] = useState('card');
  const [sectionAbout, setSectionAbout] = useState('card-section is-active');
  const [sectionExperience, setSectionExperience] = useState('card-section');
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
    setSectionExperience('card-section');
    setBtnAbout('');
    setBtnExprerience('');
    setBtnContact('');
    if (targetSection === '#experience') {
      setSectionExperience((prev) => (prev += ' is-active'));
      setBtnExprerience('is-active');
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
                  <p className='card-desc'>
                    {info.bio || "The user hasn't provided bio information"}
                  </p>
                </div>
                <div className='card-social'>
                  <a href='#'>
                    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z' />
                    </svg>
                  </a>
                  <a href='#'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path d='M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z' />
                    </svg>
                  </a>
                  <a href='#'>
                    <svg
                      viewBox='0 0 512 512'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0' />
                      <path d='M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0' />
                      <path d='M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0' />
                    </svg>
                  </a>
                  <a href='#'>
                    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z' />
                    </svg>
                  </a>
                </div>
              </div>
              <div className={sectionExperience} id='experience'>
                <div className='card-content'>
                  <div className='card-subtitle'>WORK EXPERIENCE</div>

                  <Exprerience experience={experience} />
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
                    <button className='green'>WORK</button>
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
                  className={btnExprerience}
                  data-section='#experience'
                  onClick={handleButtonClick}
                >
                  EXPERIENCE
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