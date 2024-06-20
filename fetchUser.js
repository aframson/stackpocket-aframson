const fetchUserData = async function(url) {
  const response = await fetch(url);
  return response.json();
};
