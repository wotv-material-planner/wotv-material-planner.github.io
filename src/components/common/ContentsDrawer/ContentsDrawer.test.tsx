import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {ContentsDrawer} from './ContentsDrawer';

describe('ContentsDrawer', () => {
    it('renders an ContentsDrawer', () => {
        renderSubject({
            title: 'Slothbear List'
        });

        expect(screen.getByText('Slothbear List')).toBeTruthy();
    });
});

interface OptionalProps {
    title?: string;
    fixed?: boolean;
};

const renderSubject = (props: OptionalProps) => {
    return render(
        <ContentsDrawer {...makeProps(props)} />
    );
};

const makeProps = (props: OptionalProps) => {
    return {
        title: props.title || '',
        fixed: props.fixed,
    };
};