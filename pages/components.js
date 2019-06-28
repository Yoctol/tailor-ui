import React from 'react';
import styled from 'styled-components';

import ComponentCard from 'docs/src/modules/components/ComponentCard';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  Flex,
  Heading,
  Icon,
  Input,
  Mention,
  Menu,
  Modal,
  Popconfirm,
  Popover,
  Position,
  Radio,
  Select,
  Spin,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TelInput,
  Text,
  TextField,
  Tooltip,
  Upload,
  useMessage,
} from 'tailor-ui';
import {
  Select as LabSelect,
  Tabs as LabTabs,
  Tag as LabTag,
} from '@tailor-ui/lab';

const StyledWrapper = styled.div``;

const StyledSection = styled.section`
  width: 100%;
`;

const ComponentGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
`;

const SectionTitle = styled.h1`
  margin: 15px calc(8% / 6);
  color: #626262;
  font-weight: 200;
`;

const SectionDivider = styled(Divider)`
  margin: 20px 0;
  padding: 0 calc(8% / 6);
`;

const Components = () => {
  const [on, set] = React.useState(false);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [menuValue, setMenuValue] = React.useState('1');
  const [selectValue, setSelectValue] = React.useState({
    label: 'Item 1',
    value: 1,
  });
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [tabValue, setTabValue] = React.useState('1');
  const message = useMessage();
  const [labSelectValue, setLabSelectValue] = React.useState({
    label: 'Banana',
    value: 'banana',
  });
  const [labTabValue, setLabTabValue] = React.useState('1');

  return (
    <StyledWrapper>
      <StyledSection>
        <SectionTitle>Layouts</SectionTitle>
        <ComponentGroup>
          <ComponentCard title="Box" href="components/layout/box">
            <h1>Box?</h1>
          </ComponentCard>
          <ComponentCard title="Flex" href="components/layout/flex">
            <h1>Flex?</h1>
          </ComponentCard>
          <ComponentCard title="Grid" href="components/layout/grid">
            <h1>Grid?</h1>
          </ComponentCard>
          <ComponentCard
            title="Responsive Styles"
            href="components/layout/responsive"
          >
            <h1>Responsive Styles?</h1>
          </ComponentCard>
          <ComponentCard
            title="Spacing Scale?"
            href="components/layout/spacing-scale"
          >
            <h1>Spacing Scale</h1>
          </ComponentCard>
          <ComponentCard
            title="Width / Height Scale?"
            href="components/layout/width-scale"
          >
            <h1>Width / Height Scale</h1>
          </ComponentCard>
        </ComponentGroup>
      </StyledSection>

      <StyledSection>
        <SectionTitle>Components</SectionTitle>
        <ComponentGroup>
          <SectionDivider>FUNDAMENTAL UI ELEMENTS</SectionDivider>
          <ComponentCard title="Alert" href="components/alert">
            <Alert message="Alert" type="success" />
          </ComponentCard>
          <ComponentCard title="Button" href="components/button">
            <Button rounded variant="primary">
              Primary
            </Button>
            <Button rounded variant="danger">
              Danger
            </Button>
          </ComponentCard>
          <ComponentCard title="Card" href="components/card">
            <Card hoverable>
              <Card.Block>Title</Card.Block>
              <Card.Block>Content</Card.Block>
            </Card>
          </ComponentCard>
          <ComponentCard title="Icon" href="components/icon">
            <Flex alignItems="center">
              LINE <Icon mx="2" type="line" />
            </Flex>
            <Flex alignItems="center">
              Messenger <Icon mx="2" type="messenger" />
            </Flex>
            <Flex alignItems="center">
              Robot <Icon mx="2" type="robot" />
            </Flex>
          </ComponentCard>
          <ComponentCard title="Spin" href="components/spin">
            <Spin />
          </ComponentCard>
          <ComponentCard
            title="Switch"
            justifyContent="center"
            alignItems="center"
            href="components/switch"
          >
            &darr;
            <Switch
              checked={switchChecked}
              onChange={() => setSwitchChecked(!switchChecked)}
            />
          </ComponentCard>
          <ComponentCard title="Checkbox" href="components/checkbox">
            <Checkbox defaultChecked>Uncontrolled Checkbox</Checkbox>
            <br />
            <Checkbox checked={on} onChange={() => set(!on)}>
              Controlled Checkbox
            </Checkbox>
            <br />
            <Checkbox disabled>Disabled Checkbox</Checkbox>
          </ComponentCard>
          <ComponentCard title="Divider" href="components/divider">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <Divider>Divider</Divider>
            Sed nonne merninisti licere mihi ista probare.
          </ComponentCard>
          <ComponentCard title="Radio" href="components/radio">
            <Radio>Radio 1</Radio>
            <br />
            <Radio>Radio 2</Radio>
            <br />
            <Radio>Radio 3</Radio>
            <br />
          </ComponentCard>
          <ComponentCard title="Table" href="components/table">
            <Box
              width="100%"
              borderRadius="xl"
              bg="#eef0f5"
              border="3px solid #EEF0F5"
            >
              <Table>
                <Table.Head>
                  <Table.HeadColumn>Name</Table.HeadColumn>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Column>TestBot</Table.Column>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Box>
          </ComponentCard>
          <ComponentCard title="Tag" href="components/tag">
            <Flex justifyContent="center" alignItems="center">
              <Tag>Typescript</Tag>
              <Tag>Javascript</Tag>
            </Flex>
          </ComponentCard>

          <SectionDivider>ESSENTIAL FORM ELEMENTS</SectionDivider>
          <ComponentCard
            title="Input"
            href="components/input"
            justifyContent="center"
            alignItems="center"
          >
            <Input placeholder="Enter something..." />
          </ComponentCard>
          <ComponentCard
            title="TelInput"
            href="components/telinput"
            justifyContent="center"
            alignItems="center"
          >
            <TelInput onChange={console.log} />
          </ComponentCard>
          <ComponentCard
            title="Mention"
            href="components/mention"
            padding="10px"
            justifyContent="center"
            alignItems="center"
          >
            <Mention
              defaultValue="I love {{McDonalds}}."
              suggestions={['McDonalds', 'KFC']}
              onChange={v => console.log(v)}
            />
          </ComponentCard>
          <ComponentCard title="Date Picker" href="components/datepicker">
            <DatePicker
              onChange={console.log}
              placeholder="Please Select Date & Time"
              showTime
              showSecond
            />
          </ComponentCard>
          <ComponentCard
            title="Upload"
            justifyContent="center"
            alignItems="center"
            href="components/upload"
          >
            <Upload
              onSelect={() => new Promise(resolve => setTimeout(resolve, 2000))}
            />
          </ComponentCard>
          <ComponentCard
            title="Textfield"
            href="components/textfield"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              label="Text Field"
              onChange={event => console.log(event.target.value)}
            />
          </ComponentCard>
          <ComponentCard title="Steps" href="components/steps" padding="10px">
            <Steps current={1} direction="vertical">
              <Steps.Step
                title="Finished"
                description="This is a description"
              />
              <Steps.Step title="Waiting" description="This is a description" />
            </Steps>
          </ComponentCard>

          <SectionDivider>POP-UP ELEMENTS</SectionDivider>
          <ComponentCard title="Drawer" href="components/drawer">
            <Button onClick={() => setDrawerVisible(!drawerVisible)}>
              Open
            </Button>
            <Drawer
              title="Title"
              visible={drawerVisible}
              onClose={() => setDrawerVisible(false)}
            >
              Example Drawer.
            </Drawer>
          </ComponentCard>
          <ComponentCard title="Dropdown" href="components/dropdown">
            <Dropdown
              overlay={
                <Dropdown.List>
                  <Dropdown.Item>close when click</Dropdown.Item>
                  <Dropdown.Item keep>keep dropdown when click</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item disabled>disabled</Dropdown.Item>
                  <Dropdown.Item color="danger">delete</Dropdown.Item>
                </Dropdown.List>
              }
            >
              <Button>Magic</Button>
            </Dropdown>
          </ComponentCard>
          <ComponentCard title="Modal" href="components/modal">
            <Modal
              title="This is a Modal"
              visible={modalVisible}
              closable
              onConfirm={() => setModalVisible(false)}
              onCancel={() => setModalVisible(false)}
            >
              In user interface design for computer applications, a modal window
              is a graphical control element subordinate to an
              application&apos;s main window. It creates a mode that disables
              the main window but keeps it visible, with the modal window as a
              child window in front of it. Users must interact with the modal
              window before they can return to the parent application. This
              avoids interrupting the workflow on the main window. Modal windows
              are sometimes called heavy windows or modal dialogs because they
              often display a dialog box.
            </Modal>
            <Button onClick={() => setModalVisible(true)}>Open Modal</Button>
          </ComponentCard>
          <ComponentCard title="Popconfirm" href="components/popconfirm">
            <Popconfirm
              position={Position.RIGHT}
              content="Are you sure you want to pop this?"
              onConfirm={() => console.log('confirm')}
              onCancel={() => console.log('cancel')}
            >
              <Button>Pop me!</Button>
            </Popconfirm>
          </ComponentCard>
          <ComponentCard title="Popover" href="components/popover">
            <Popover title="Title" content="Content">
              <Button>Popover here.</Button>
            </Popover>
          </ComponentCard>
          <ComponentCard title="Tooltip" href="components/tooltip">
            <Tooltip content="Tooltip Content">
              <Button>Hover</Button>
            </Tooltip>
          </ComponentCard>
          <ComponentCard title="Message" href="components/message">
            <Button onClick={() => message.info('This is a info message!')}>
              Info
            </Button>
            <Button
              onClick={() => message.success('This is a success message!')}
            >
              Success
            </Button>
            <Button
              onClick={() => message.warning('This is a warning message!')}
            >
              Warning
            </Button>
          </ComponentCard>

          <SectionDivider>MENU AND NAVIGATION ELEMENTS</SectionDivider>
          <ComponentCard title="Select" href="components/select">
            <Select
              value={selectValue}
              onChange={setSelectValue}
              options={[
                {
                  label: 'Item 1',
                  value: 1,
                },
                {
                  label: 'Item 2',
                  value: 2,
                },
                {
                  label: 'Item 3',
                  value: 3,
                },
                {
                  label: 'Item 4',
                  value: 4,
                },
                {
                  label: 'Item 5',
                  value: 5,
                },
              ]}
            />
          </ComponentCard>
          <ComponentCard
            title="Tabs"
            alignItems="center"
            href="components/tabs"
          >
            <Tabs activeValue={tabValue} onChange={setTabValue}>
              <Tabs.Tab value="1" label="Tab 1" />
              <Tabs.Tab value="2" label="Tab 2" />
            </Tabs>
          </ComponentCard>
          <ComponentCard
            title="Menu"
            justifyContent="center"
            alignItems="center"
            href="components/menu"
          >
            <Menu width="100%">
              <Menu.SubMenu id="understood" title="Group 1" icon="understood">
                <Menu.Item
                  active={menuValue === '1'}
                  onClick={() => setMenuValue('1')}
                >
                  Item 1
                </Menu.Item>
                <Menu.Item
                  active={menuValue === '2'}
                  onClick={() => setMenuValue('2')}
                >
                  Item 2
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </ComponentCard>
        </ComponentGroup>
      </StyledSection>

      <StyledSection>
        <SectionTitle>Lab</SectionTitle>
        <ComponentGroup>
          <ComponentCard
            title="Select"
            href="components/lab/select"
            justifyContent="center"
            alignItems="center"
          >
            <LabSelect
              width="100%"
              value={labSelectValue}
              onChange={newValue => setLabSelectValue(newValue)}
              options={[
                { label: 'Banana', value: 'banana' },
                { label: 'Orange', value: 'orange' },
                { label: 'Apple', value: 'apple' },
                { label: 'Mango', value: 'mango' },
              ]}
            />
          </ComponentCard>
          <ComponentCard
            title="Tabs"
            href="components/lab/tabs"
            alignItems="center"
          >
            <Box bg="primaryDark2" p="1" borderRadius="5px">
              <LabTabs value={labTabValue} onChange={setLabTabValue}>
                <LabTabs.Tab value="1">Tab 1</LabTabs.Tab>
                <LabTabs.Tab value="2">Tab 2</LabTabs.Tab>
              </LabTabs>
            </Box>
          </ComponentCard>
          <ComponentCard
            title="Tag"
            href="components/lab/tag"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
          >
            <LabTag>Content</LabTag>
            <LabTag invalid>Content</LabTag>
          </ComponentCard>
        </ComponentGroup>
      </StyledSection>

      <StyledSection>
        <SectionTitle>Typography</SectionTitle>
        <ComponentGroup>
          <ComponentCard title="Heading" href="components/typography/heading">
            <Heading.h3>
              H3 Heading <small>20px</small>
            </Heading.h3>
            <Heading.h4>
              H4 Heading <small>18px</small>
            </Heading.h4>
            <Heading.h5>
              H5 Heading <small>16px</small>
            </Heading.h5>
            <Heading.h6>
              H6 Heading <small>14px</small>
            </Heading.h6>
          </ComponentCard>
          <ComponentCard title="Text" href="components/typography/text">
            <Text
              color="primaryDark"
              letterSpacing={1.5}
              lineHeight="2"
              textAlign="center"
            >
              Dolorem, modi sit? Nisi dolorum hic aperiam blanditiis, modi vitae
              repellat?
            </Text>
          </ComponentCard>
        </ComponentGroup>
      </StyledSection>

      <StyledSection>
        <SectionTitle>Others</SectionTitle>
        <ComponentGroup>
          <ComponentCard title="UIProvider" href="components/others/uiprovider">
            <h1>UIProvider?</h1>
          </ComponentCard>
          <ComponentCard title="Colors" href="components/others/colors">
            <h1>Colors</h1>
          </ComponentCard>
        </ComponentGroup>
      </StyledSection>
    </StyledWrapper>
  );
};

export default Components;
