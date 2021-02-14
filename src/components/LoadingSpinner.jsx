import styled from 'styled-components';

const Spinner = styled.div`
  width: 150px;
  height: 150px;
  animation: spin 0.8s linear infinite;
  border-style: solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: red;
  border-left-color: red;
  border-width: 5px;
  border-radius: 50%;
  position: absolute;
  right: 50%;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Backdrop = styled.div`
  display: flex;
  background-color: rgba(1, 1, 1, 0.3);
  z-index: 2;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
`;

function LoadingSpinner() {
  return (
    <Backdrop>
      <Spinner />
    </Backdrop>
  );
}

export default LoadingSpinner;
