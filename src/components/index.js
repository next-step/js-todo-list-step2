import { setUserCreateEvent } from '../event/AddEvent.js';
import render from './Render/index.js';
const Home = async () => {
  await render();
  setUserCreateEvent();
};

export default Home;
