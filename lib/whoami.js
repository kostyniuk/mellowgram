'use strict';

module.exports = (req, res, next) => {
  if (req.user) {
    return res.json({
      success: true,
      data: { username: req.user.username, id: req.user.user_id },
    });
  }
  res.json({ success: false, user: null });
};
