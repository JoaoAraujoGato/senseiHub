import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar/SideBar';
import { Topbar } from './Topbar';
import { Layout, Content } from './AppLayoutStyle';

export function AppLayout() {
    const [menuAberto, setMenuAberto] = useState(true);

    return (
        <Layout>
            <Sidebar aberta={menuAberto} />
            <Content>
                <Topbar onToggleMenu={() => setMenuAberto(v => !v)} />
                <Outlet />
            </Content>
        </Layout>
    );
}
