import axios from 'axios';
const instance = axios.create({
   baseURL: 'https://react-burgerproject-82b0b.firebaseio.com/'
})

export default instance;
