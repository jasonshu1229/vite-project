import styled from "styled-components";

export const SectionDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: lightgray;
  transition: transform 1s;

  &:hover {
    transform: scale(1.2);
  }
`;
