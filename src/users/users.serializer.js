// import _ from "lodash";

export function composeUsers(users) {
  const isArray = users instanceof Array;
  if (isArray) {
    return users.map(composeUser);
  }

  return composeUser(users);
}

function composeUser(user) {
  return {
    id: user.id,
    avatarURL:user.avatarURL,
    email: user.email,
    subscription:user.subscription,
    token: user.token,
    verificationToken:user.verificationToken
  };
}