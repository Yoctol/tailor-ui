import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  Label,
  Icon,
  injectGlobalCss,
  Menu,
  Modal,
  Select,
  Table,
  Tabs,
  Tooltip,
  colors,
} from '../';

describe('index', () => {
  it('should export all components', () => {
    expect(Button).toBeDefined();
    expect(Card).toBeDefined();
    expect(Checkbox).toBeDefined();
    expect(Dropdown).toBeDefined();
    expect(Input).toBeDefined();
    expect(Label).toBeDefined();
    expect(Icon).toBeDefined();
    expect(injectGlobalCss).toBeDefined();
    expect(Menu).toBeDefined();
    expect(Modal).toBeDefined();
    expect(Select).toBeDefined();
    expect(Table).toBeDefined();
    expect(Tabs).toBeDefined();
    expect(Tooltip).toBeDefined();
    expect(colors).toBeDefined();
  });
});
