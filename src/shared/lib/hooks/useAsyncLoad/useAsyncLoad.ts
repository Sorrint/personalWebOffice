import { useEffect, useState } from 'react'

const modulePaths = {
    'date-fns/locale/ru': import('date-fns/locale/ru'),
    'date-fns/format': import('date-fns/format'),
    // Добавьте другие пути по вашему усмотрению
};

type ModulePaths = typeof modulePaths;
type ModulePathKey = keyof ModulePaths;
type ModulePathValue<T extends ModulePathKey> = ModulePaths[T];

export function useAsyncLoad<T extends ModulePathKey>(modulePath: T): Awaited<ModulePathValue<T>> | null {
    const [module, setModule] = useState<Awaited<ModulePathValue<T>> | null>(null);
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        let isMounted = true;
  
        const loadModule = async () => {
            try {
                const loadedModule = await modulePaths[modulePath];
                if (isMounted) {
                    setModule(loadedModule);
                    setIsLoaded(true)
                }
            } catch (error) {
                console.error(`Ошибка загрузки модуля ${modulePath}:`, error);
            }
        };
  
        loadModule();
  
        return () => {
            isMounted = false;
        };
    }, [modulePath]);
  
    return isLoaded ? module : null;
}