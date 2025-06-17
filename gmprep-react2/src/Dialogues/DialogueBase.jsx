import { forwardRef } from "react";

const DialogBase = forwardRef(({children, onCancel, onSubmit}, ref) => {

	function submit() {
		onSubmit(1);
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