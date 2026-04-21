# Asset Management Tracker

Drop your images, graphics, and PDFs into these respective folders within `public/assets/`. When you reference them in the code, use the relative path starting with `/assets/`.

## Directory Structure Needed

Please create/use the following folders here for organization:

1. `/assets/events/` - For the new Graphics & Events page (e.g., conference photos, speeches).
2. `/assets/projects/` - For the Research/Drosophila page (e.g., microscope images, lab charts).
3. `/assets/lab/` - For DRTC team photos and equipment.
4. `/assets/cv/` - For PDF downloads of the CV or certificates.

## How to use in Next.js

```tsx
import Image from 'next/image'

// Example for an event photo
<Image src="/assets/events/conference-2023.jpg" alt="Speaking at Conference" width={800} height={600} />
```
