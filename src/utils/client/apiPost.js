const apiPost = ({ route, body = '' }) => fetch(`/api${route}`, {
  method: 'POST',
  body,
}).then((res) => res.json());

export {
  apiPost,
};
