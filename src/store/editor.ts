import { atom } from "jotai";


export const codeAtom = atom<string>('');
export const savedCodeAtom = atom<string>('');
export const isModifiedAtom = atom((get)=> get(codeAtom) !== get(savedCodeAtom));   


export const projectIdAtom = atom<string>('');
export const fileNameAtom  = atom<string>('schema.ts');

export const loadProjectAtom = atom(
    null, 
    async(get , set) => {
        const projectId = get(projectIdAtom);
        const fileName = get(fileNameAtom)
    
    try {
        const key = `project:${projectId}:file:${fileName}`;
        const result = localStorage.getItem(key);
            
        if(result)
        {
        set(codeAtom, result);
        set(savedCodeAtom, result);
        }
    }
    catch(err)
    {
        console.log("No saved project found");
    }
}
) 