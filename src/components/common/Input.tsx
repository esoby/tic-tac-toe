import styled from "@emotion/styled";

interface InputProps {
  id: string;
  labelText: string;
  type: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ id, labelText, type, value, onChange, placeholder }) => {
  return (
    <InputBlock>
      <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
      <StyledInput
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputBlock>
  );
};

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #cecece;
  outline-color: gray;
`;

const StyledLabel = styled.label`
  padding: 2px;
  text-align: left;
  color: #5d5d5d;
  font-size: small;
  font-weight: 500;
`;

export default Input;
