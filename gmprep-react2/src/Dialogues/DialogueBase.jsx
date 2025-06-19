import { forwardRef } from "react";
import '../App.css'

const DialogBase = forwardRef(({children, onCancel, onSubmit}, ref) => {

	function submit() {
		onSubmit();
	}

	function cancel() {
		onCancel();
	}


	return (
		<dialog ref={ref}>
			<div>
				{children}
				<button onClick={cancel}>Cancel</button>
				<button onClick={submit}>Submit</button>
			</div>
		</dialog>
	);
});

export default DialogBase;