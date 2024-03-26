import { FormikErrors } from "formik";

const UploadFile = ({ data, setFieldValue, errors, disabled }) => {
  return (
    <div>
      <input
        disabled={disabled}
        type="file"
        name="archivo"
        // set supported file types here,
        // could also check again within formik validation or backend
        onChange={(e) => {
          // Object is possibly null error w/o check
          if (e.currentTarget.files) {
            setFieldValue("archivo", e.currentTarget.files[0]);
          }
        }}
      />
      {errors.image && (
        <>
          <br />
          <span id="error">{errors.image}</span>
          <br />
        </>
      )}
    </div>
  );
};

export default UploadFile;
