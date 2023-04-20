import {surpriseMePrompts} from '../constants'

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    //if we get same prompt again than we can recall the function
    if(randomPrompt === prompt) return getRandomPrompt[prompt];
    return randomPrompt;
}