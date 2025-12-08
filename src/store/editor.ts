import { atom } from "jotai";

export const projectIdAtom = atom<string>('');
export const fileNameAtom  = atom<string>('schema.ts');

export const loadProjectAtom = atom(
    null, 
    async(get , set) => {
        const projectId = get(projectIdAtom);
        const fileName = get(fileNameAtom)
    
    try {
        const result = await window.Storage.get(
            `project:${projectId}:file:${fileName}`
        );
        if(result)
        {
            const loadedCode = result.value;
        }
    }
    catch(err)
    {
        console.log("No saved project found");
    }
}
) 