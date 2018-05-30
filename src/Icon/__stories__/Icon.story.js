import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import { TiFlowChildren } from 'react-icons/lib/ti';
import { MdEdit, MdComment, MdInput } from 'react-icons/lib/md';

import Icon from '../';

storiesOf('General|Icon', module)
  .addDecorator(centered)
  .add('with built-in icon', () => (
    <div>
      <Icon mx={2} type="line" />
      <Icon mx={2} type="messenger" />
      <Icon mx={2} type="understood" />
      <Icon mx={2} type="kurator" />
      <Icon mx={2} type="touch" />
      <Icon mx={2} type="analytics" />
      <Icon mx={2} type="settings" />
    </div>
  ))
  .addDecorator(centered)
  .add('with custom props', () => (
    <div>
      <Icon mx={2} fill="#00c300" type="line" />
      <Icon mx={2} fill="#0084ff" type="messenger" />
      <Icon mx={2} fill="primaryLight" size={32} type="understood" />
      <Icon mx={2} fill="primaryLight" size={32} type="kurator" />
      <Icon mx={2} fill="primaryLight" size={32} type="touch" />
      <Icon mx={2} fill="primaryLight" size={32} type="analytics" />
      <Icon mx={2} fill="primaryLight" size={32} type="settings" />
      <Icon mx={2} fill="secondary" size={48} type={MdEdit} />
      <Icon mx={2} fill="secondary" size={48} type={MdComment} />
      <Icon mx={2} fill="secondary" size={48} type={MdInput} />
      <Icon mx={2} fill="secondary" size={48} type={TiFlowChildren} />
    </div>
  ))
  .add('with react-icons', () => (
    <div>
      <Icon mx={2} type={MdEdit} />
      <Icon mx={2} type={MdComment} />
      <Icon mx={2} type={MdInput} />
      <Icon mx={2} type={TiFlowChildren} />
    </div>
  ))
  .add('with cursor', () => (
    <div>
      <Icon mx={2} onClick={action('click MdEdit')} type={MdEdit} />
      <Icon
        mx={2}
        cursor="pointer"
        onClick={action('click MdComment')}
        type={MdComment}
      />
      <Icon
        mx={2}
        cursor="grab"
        onClick={action('click MdInput')}
        type={MdInput}
      />
      <Icon
        mx={2}
        cursor="help"
        onClick={action('click TiFlowChildren')}
        type={TiFlowChildren}
      />
    </div>
  ));
