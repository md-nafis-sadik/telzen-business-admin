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
  border-top: 2px solid #e47a48;
  border-right: 2px solid #e47a48;
  border-bottom: 2px solid #e47a48;
  border-left: 4px solid #c12b14;
  background: transparent;
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;

const CustomSpinner = () => (
  <div className="flex flex-col items-center justify-center h-[300px]">
    <Spinner />
    <div className="text-text-900 text-lg font-medium">Loading...</div>
  </div>
);

export default CustomSpinner;
