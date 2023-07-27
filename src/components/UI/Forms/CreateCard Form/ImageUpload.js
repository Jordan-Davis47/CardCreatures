import { useState, useEffect, useRef, Fragment } from "react";

import Button from "../../Button";
import classes from "./ImageUpload.module.css";

const ImageUpload = (props) => {
	const [file, setFile] = useState();
	const currentImg = props.currentImg ? props.currentImg : false;
	const [previewUrl, setPreviewUrl] = useState(currentImg);
	const [isValid, setIsValid] = useState(false);

	const filePickerRef = useRef();
	console.log(currentImg);

	useEffect(() => {
		if (!file) {
			return;
		}

		setPreviewUrl(window.URL.createObjectURL(file));
	}, [file]);

	const pickedHandler = (e) => {
		let pickedFile;
		let fileIsValid = isValid;

		if (!currentImg || e.target.files.length === 1) {
			if (e.target.files && e.target.files.length === 1) {
				pickedFile = e.target.files[0];
				setFile(pickedFile);
				setIsValid(true);
				fileIsValid = true;
			} else {
				setIsValid(false);
				fileIsValid = false;
			}
			props.pickFile(e);
		}
	};

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	console.log(file);

	return (
		<Fragment>
			<input id={props.id} ref={filePickerRef} type="file" style={{ display: "none" }} accept=".jpg,.png,.jpeg " onChange={pickedHandler} />
			<div className={classes.imageUpload}>
				<div className={classes.imageUploadPreview}>
					{previewUrl && <img src={previewUrl} alt="Preview" width={400} height={400} />}
					{!previewUrl && <p>Please pick an image</p>}
				</div>
				<Button type="button" onClick={pickImageHandler}>
					Pick Image
				</Button>
			</div>
		</Fragment>
	);
};

export default ImageUpload;
