import { TreeCanvas } from '../components/TreeCanvas/TreeCanvas';
import { PersonDetail } from '../components/Sidebar/PersonDetail';
import { StatsBar } from '../components/UI/StatsBar';

export function HomePage() {
  return (
    <div className="home-page">
      <StatsBar />
      <div className="home-page__content">
        <TreeCanvas />
        <PersonDetail />
      </div>
    </div>
  );
}
