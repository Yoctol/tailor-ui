import {
  Box,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Flex,
  Hint,
  Icon,
  Input,
  Label,
  Menu,
  Modal,
  Radio,
  Select,
  Table,
  Tabs,
  Textarea,
  Tooltip,
  colors,
  injectGlobalCss,
} from '../';

describe('index', () => {
  it('should export all components', () => {
    expect(Box).toBeDefined();
    expect(Button).toBeDefined();
    expect(Card).toBeDefined();
    expect(Checkbox).toBeDefined();
    expect(Dropdown).toBeDefined();
    expect(Flex).toBeDefined();
    expect(Hint).toBeDefined();
    expect(Icon).toBeDefined();
    expect(Input).toBeDefined();
    expect(Label).toBeDefined();
    expect(Menu).toBeDefined();
    expect(Modal).toBeDefined();
    expect(Radio).toBeDefined();
    expect(Select).toBeDefined();
    expect(Table).toBeDefined();
    expect(Tabs).toBeDefined();
    expect(Textarea).toBeDefined();
    expect(Tooltip).toBeDefined();
    expect(colors).toBeDefined();
    expect(injectGlobalCss).toBeDefined();
  });
});
