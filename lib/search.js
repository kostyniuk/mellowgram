module.exports = {
  based_inRegExp: ({ country, city }) => {
    console.log({ country, city });

    if (country === 'any') {
      return '%';
    } else if (country !== 'any' && city === 'any') {
      return `%${country}%`;
    } else {
      return `${city}, ${country}`;
    }
  },

  isMatchAll: (bool, num) => {
    if (bool === 'true') return `= ${num}`;
    return '>= 1';
  },

  prepareResponce: (arr) => {
    const parsed = {};

    arr.map((interestsInfo) => {
      if (!parsed[interestsInfo.user_id]) {
        parsed[interestsInfo.user_id] = {
          ...interestsInfo,
          interests: {
            [interestsInfo.interest_id]: {
              interest_id: interestsInfo.interest_id,
              interest_category: interestsInfo.interest_category,
              interest_name: interestsInfo.interest_name,
              interest_color: interestsInfo.interest_color,
              interest_emoji: interestsInfo.interest_emoji,
            },
          },
        };
        delete parsed[interestsInfo.user_id].interest_id;
        delete parsed[interestsInfo.user_id].interest_category;
        delete parsed[interestsInfo.user_id].interest_name;
        delete parsed[interestsInfo.user_id].interest_color;
        delete parsed[interestsInfo.user_id].interest_emoji;
      } else {
        parsed[interestsInfo.user_id].interests[interestsInfo.interest_id] = {
          interest_id: interestsInfo.interest_id,
          interest_category: interestsInfo.interest_category,
          interest_name: interestsInfo.interest_name,
          interest_color: interestsInfo.interest_color,
          interest_emoji: interestsInfo.interest_emoji,
        };
      }
    });
    return parsed;
  },
};
