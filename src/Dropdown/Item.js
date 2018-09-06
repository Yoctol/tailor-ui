import styled from 'styled-components';
import { space } from 'styled-system';

const Item = styled.li`
  margin-top: 0;
  padding: ${p => p.theme.space.paddingY} ${p => p.theme.space.paddingX};
  background-color: ${p => p.theme.colors.light};
  color: ${p => p.theme.colors.gray[4]};
  font-size: ${p => p.theme.fontSizes.default};
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
