function getCurrentUser(){
  return {
    userName: 'admin',
    isNotAuth() {
      return false;
    }
  }
}
module.exports = {
  getCurrentUser,
};