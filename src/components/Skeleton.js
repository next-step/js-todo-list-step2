/* @jsx createElement */
import { createElement } from '../lib/React.js';

const Skeleton = () => {
  return (
    <div className="animated-background">
      <div className="skel-mask-container">
        <div className="skel-mask"></div>
      </div>
    </div>
  );
};

export default Skeleton;
