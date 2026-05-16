Entendido! Para um nível **Pleno**, o avaliador não quer apenas ver se o código funciona, mas se você escreve código **limpo, performático e resiliente**.

Aqui estão 20 "post-its" com trechos de código concisos e essenciais para colar mentalmente (ou fisicamente) no seu monitor durante o Live Coding:

---

### 1. Atualização segura de Estado

Sempre que o novo valor depender do anterior.

```javascript
setCount(prev => prev + 1);

```

### 2. Imutabilidade (Objetos)

Nunca altere, sempre substitua.

```javascript
setUser(prev => ({ ...prev, 
  name: 'Gemini' }));

```

### 3. Cleanup no useEffect

Evite vazamento de memória e bugs de timer/eventos.

```javascript
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);

```

### 4. Fetching com useEffect

`useEffect` para chamadas de API.

```javascript
  useEffect(() => {
    fetch('...com/users/1')
      .then(res => res.json())
      .then(setUser);
  }, []); // [] = roda só na montagem

  if (!user) return <div>Carregando...</div>;
  return <h1>{user.name}</h1>;
}

```


### 5. Custom Hook (Template)

Extraia lógica repetitiva.

```javascript
function useToggle(initial = false) {
  const [v, setV] = useState(initial);
  const toggle = () => setV(!v);
  return [v, toggle];
}

```

### 6. Debounce Simples

Ideal para inputs de busca (Wikipedia/Users List).

```javascript
useEffect(() => {
  const t = setTimeout(() => 
  search(query), 500);

  return () => clearTimeout(t);
}, [query]);

```

### 7. Custom Hook Fetch
Crie hook reutilizável para data fetching.

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(setData);
  }, [url]);
  return data;
}
```

### 8. Refs para Acesso ao DOM

Focar input no carregamento (Phone Field).

```javascript
const inputRef = useRef(null);
useEffect(() => 
  inputRef.current.focus(), []);

```

### 9. Condicional Curto-Circuito

zero renderiza o número zero na tela.
Use `!!`.

```javascript
{!!items.length && <List />}

```

### 10. List com Key

listas com key única para performance.

```javascript
{items.map(item => (
  <Item key={item.id} {...item} />
))}
```

### 11. useRef DOM

Acesse elemento DOM diretamente.

```javascript
const inputRef = useRef(null);
useEffect(() => 
  inputRef.current?.focus(), []);
<input ref={inputRef} />
```

### 12. useCallback

Mantenha a identidade da função entre renders.

```javascript
 const handleClick = useCallback(() 
  => {  // ← Mesma referência!
    console.log('Clicou!');
  }, []);  // [] = só cria uma vez

```

### 13. Conditional Render
Renderize elementos baseado em estado ou prop.

```javascript
{loading ? <Spinner /> 
  : <DataList data={data} />}

```

### 14. Form Controlado
Gerencie input com estado React.

```javascript
const [value, setValue] 
  = useState('');
<input value={value} 
  onChange={e => 
  setValue(e.target.value)} />
```

### 15. Padronização de fetch (Status)

Sempre trate os três estados.

```javascript
if (loading) return <Spinner />;
if (error) 
  return <Error message={error} />;
return <Data data={data} />;

```

### 16. Context API (Provider)

Para temas ou autenticação (Airbnb Challenge).

```javascript
export const UserContext 
  = createContext();
<UserContext.Provider
  value={user}>{children}
</UserContext.Provider>

```

### 17. Fragment Shorthand

Evite `<div>` desnecessárias no DOM.

```javascript
<> <Child1 /> <Child2 /> </>

```

### 18. CSS Dinâmico (Template Literals)

Classes baseadas em estado.

```javascript
<div className=
{`tab ${active ? 'active' : ''}`} />

```

### 19. ForwardRef (React < 19)

Passar ref para componente filho.

```javascript
const MyInput 
  = forwardRef((props, ref) => 
    <input ref={ref} {...props} />);

```

### 20. useState Básico
Gerencie estado local simples em componentes funcionais.

```typescript
const [count, setCount] 
  = useState(0);
```

---

**Dica para a prova:** Se você esquecer a sintaxe de algo complexo, foque no **Post-it #7**. Muitos devs tentam resolver tudo com `useEffect` e `useState` (criando loops), enquanto a lógica de renderização simples resolve a maioria dos desafios intermediários. Boa sorte!