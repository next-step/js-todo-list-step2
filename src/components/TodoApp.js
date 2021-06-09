/* @jsx createElement */
import { createElement } from '../lib/React.js';

const TodoApp = ({ children }) => {
  return (
    <section className="todoapp">
      <main>{children}</main>
    </section>
  );
};

export default TodoApp;
