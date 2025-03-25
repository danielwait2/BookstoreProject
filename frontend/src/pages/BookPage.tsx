import '../App.css';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Adjust this if your top banner is taller or shorter
    const bannerHeight = 80; // in pixels

    return (
        <>
            {/* Fixed Top Banner */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${bannerHeight}px`,
                    zIndex: 9999,
                    backgroundColor: 'blue',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1rem',
                }}
            >
                {/* Put your banner content here */}
                <CartSummary />
                <WelcomeBand />
            </div>

            {/* Main container: push it down by bannerHeight so it's not hidden behind the banner */}
            <div style={{ marginTop: `${bannerHeight}px` }}>
                <div
                    className="container-fluid"
                    style={{ margin: 0, padding: 0 }}
                >
                    <div className="row" style={{ margin: 0, padding: 0 }}>
                        {/* Fixed Left Sidebar: start below the banner */}
                        <div
                            className="col-md-3 bg-light"
                            style={{
                                position: 'fixed',
                                top: `${bannerHeight}px`, // offset to appear below the banner
                                left: 0,
                                height: `calc(100vh - ${bannerHeight}px)`, // fill remaining vertical space
                                overflowY: 'auto',
                                borderRight: '1px solid #ddd',
                                zIndex: 999,
                            }}
                        >
                            <CategoryFilter
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                            />
                        </div>

                        {/* Main content offset to the right of fixed sidebar */}
                        <div
                            className="col-md-9 offset-md-3"
                            style={{ minHeight: '100vh', paddingTop: '20px' }}
                        >
                            <BookList selectedCategories={selectedCategories} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectsPage;
