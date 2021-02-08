import _ from "lodash";

export function composeContacts(users) {
  const isArray = users instanceof Array;
  if (isArray) {
    return users.map(composeContact);
  }

  return composeContact(users);
}

function composeContact(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    subscription:user.subscription,
  token: user.token
  };
}