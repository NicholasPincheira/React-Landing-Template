import { Navbar } from '@/Components/Navbar';
import { Hero } from '@/Components/Hero';
import { Gallery } from '@/Components/Gallery';
import { DynamicSlider } from '@/Components/DynamicSlider';
import { AmuletExhibition } from '@/Components/AmuletExhibition';
import { FloatingText } from '@/Components/FloatingText';
import { Workshops } from '@/Components/Workshops';
import { PostsSlider } from '@/Components/PostsSlider';
import { Footer } from '@/Components/Footer';



export default function Home() {
    return (
        <>
      <Navbar />
      <Hero />
      <Gallery />
      <AmuletExhibition />
      <Workshops />
      <FloatingText entryDuration={2.5} breathingDuration={2} />
      <DynamicSlider />
      <PostsSlider />
      <Footer />
        </>
    );
}
