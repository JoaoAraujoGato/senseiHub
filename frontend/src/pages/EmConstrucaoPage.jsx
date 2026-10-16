import PropTypes from 'prop-types';
import { PageContainer, PageHeader, TitleGroup } from '@/components/layout/Page';

export function EmConstrucaoPage({ titulo }) {
    return (
        <PageContainer>
            <PageHeader>
                <TitleGroup>
                    <h1>{titulo}</h1>
                    <p>Em construção.</p>
                </TitleGroup>
            </PageHeader>
        </PageContainer>
    );
}

EmConstrucaoPage.propTypes = {
    titulo: PropTypes.string.isRequired,
};
