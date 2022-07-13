import React from "react";
import download from "../images/download.jpg";
export const About = () => {
  return (
    <>
      <div className="project">
        <h1>About the Project</h1>
        <hr />
        <div className="about">
          <div className="about_left">
            <img src={download} alt="Loading"></img>
          </div>
          <div className="about_content">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis consequuntur culpa consectetur repellendus maiores
              eaque. Non, magnam? Itaque, molestias. In, perferendis dolorum
              accusantium quidem cum commodi consequatur non dolores assumenda?
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis consequuntur culpa consectetur repellendus maiores
              eaque. Non, magnam? Itaque, molestias. In, perferendis dolorum
              accusantium quidem cum commodi consequatur non dolores assumenda?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
