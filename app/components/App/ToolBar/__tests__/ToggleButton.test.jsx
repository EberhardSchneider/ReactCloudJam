import React from 'react';
import renderer from 'react-test-renderer';

import ToggleButton from '../ToggleButton';

beforeEach(() => {

});

test('button changes style when clicked', () => {
  const component = renderer.create(
    <ToggleButton />
  );
  let tree = component.toJSON();
  const styleBeforeClick = tree.props.style;

  tree.props.onClick();

  tree = component.toJSON();
  const styleAfterClick = tree.props.style;

  expect(styleBeforeClick).not.toEqual(styleAfterClick);
});

test('button should be the same as last time', () => {
  const component = renderer.create(
    <ToggleButton />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});