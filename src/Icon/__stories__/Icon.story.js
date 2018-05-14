import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import { TiFlowChildren } from 'react-icons/lib/ti';
import { MdEdit, MdComment, MdInput } from 'react-icons/lib/md';

import Icon from '../';

storiesOf('Icon', module)
  .addDecorator(centered)
  .add('with build in icon', () => (
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
  .add('with react-icons', () => (
    <div>
      <Icon mx={2} type={MdEdit} />
      <Icon mx={2} type={MdComment} />
      <Icon mx={2} type={MdInput} />
      <Icon mx={2} type={TiFlowChildren} />
    </div>
  ))
  .add('with clickable', () => (
    <div>
      <Icon mx={2} clickable onClick={action('click MdEdit')} type={MdEdit} />
      <Icon
        mx={2}
        clickable
        onClick={action('click MdComment')}
        type={MdComment}
      />
      <Icon mx={2} clickable onClick={action('click MdInput')} type={MdInput} />
      <Icon
        mx={2}
        clickable
        onClick={action('click TiFlowChildren')}
        type={TiFlowChildren}
      />
    </div>
  ));
