/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly.js';

export function Skeleton() {
  return (
    <li>
      <div className="view">
        <label className="label">
          <div className="animated-background">
            <div className="skel-mask-container">
              <div className="skel-mask"></div>
            </div>
          </div>
        </label>
      </div>
    </li>
  );
}
