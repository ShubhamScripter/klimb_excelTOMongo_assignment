import PropTypes from "prop-types";

function SendToServer({ sendJSON, showThanks }) {
  return (
    <div className="main">
      <button
        onClick={() => {
          sendJSON();
          showThanks();
        }}
      >
        Submit
      </button>
    </div>
  );
}

SendToServer.propTypes = {
  sendJSON: PropTypes.func.isRequired,
  showThanks: PropTypes.func.isRequired,
};
export default SendToServer;