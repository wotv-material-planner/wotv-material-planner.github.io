import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {App} from './App';
import {UserDataProvider} from '../contexts/UserDataProvider';

describe('App', () => {
  it('renders an App', () => {
    renderSubject({});

    expect(screen.getByText('FFBE WOTV MATERIAL PLANNER')).toBeTruthy();
  });
});

interface OptionalProps {}

const renderSubject = (props: OptionalProps) => {
  return render(
    <UserDataProvider>
      <App {...makeProps(props)} />
    </UserDataProvider>
  )
};

const makeProps = (props: OptionalProps) => {
  return {};
};