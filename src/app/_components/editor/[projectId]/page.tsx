'use client';
import { useParams } from "next/navigation";
import {useAtom , useSetAtom} from 'jotai';
import { projectIdAtom } from "~/store/editor";
export default function EditorPage() {
    const params = useParams();
    const setProjectId = useSetAtom(projectIdAtom);
    const loadProject = useSetAtom(loadProjectAtom);
    return (
        <html lang="en">
            <body>
                <main>
                    
                </main>
            </body>
        </html>
    );
}