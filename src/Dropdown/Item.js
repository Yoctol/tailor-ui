import styled from 'styled-components';
import { space } from 'styled-system';

const Item = styled.li`
  display: flex;
  align-items: center;
  height: ${p => p.theme.heights.base};
  margin-top: 0;
  padding: 0 ${p => p.theme.paddings.md};
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray[4]};
  font-size: ${p => p.theme.fontSizes.base};
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.colors.gray[8]};
  }

  ${p => p.theme.transition /* sc-declaration */};
  ${space};
`;

Item.displayName = 'Dropdown.Item';

Item.propTypes = {
  ...space.propTypes,
};

export default Item;
