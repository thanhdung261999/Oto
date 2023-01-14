import "./Icon.scss";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FcPlus } from "react-icons/fc";
export const PrevIconSlider = (props) => {
  return (
    <>
      <div className="btn-icon">
        <GrFormPrevious className="icon-prev" />
      </div>
    </>
  );
};
export const NextIconSlider = (props) => {
  return (
    <div className="btn-icon  ">
      <GrFormNext className="icon-next" />
    </div>
  );
};

export const UploadImage = (props) => {
  return (
    <label htmlFor={props.htmlFor} className="form-label label-upload">
      <FcPlus />
      Upload Image {props.index}
    </label>
  );
};
