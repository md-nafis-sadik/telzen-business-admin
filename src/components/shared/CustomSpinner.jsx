import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid #00c896;
  border-right: 2px solid #00c896;
  border-bottom: 2px solid #00c896;
  border-left: 4px solid #008f6a;
  background: transparent;
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;

const CustomSpinner = () => (
  <div className="flex flex-col items-center justify-center h-[300px]">
    <Spinner />
    <div className="text-text-900 font-semibold">Loading...</div>
  </div>
);

export default CustomSpinner;
