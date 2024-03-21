import styled from "@emotion/styled";

interface SelectProps {
  id: string;
  labelText: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  optionList: string[];
  optionTextList: string[];
}

const Select: React.FC<SelectProps> = ({
  id,
  labelText,
  value,
  onChange,
  optionList,
  optionTextList,
}) => {
  return (
    <SelectContainer>
      <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
      <StyledSelect id={id} value={value} onChange={onChange}>
        {optionList.map((val, idx) => (
          <option key={idx} value={val}>
            {optionTextList[idx]}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const StyledSelect = styled.select`
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

export default Select;
