### Ressurser du kan lese (om du står fast, eller vil lære mer senere)

- [Main Concepts](https://reactjs.org/docs/hello-world.html)-delen av React-dokumentasjonen er en fantastisk innføring i de mest grunnleggende konseptene i React.
- [React Tutorial For Beginners](https://egghead.io/courses/the-beginner-s-guide-to-react)-kurset til Kent C. Dodds er en strålende introduksjon til hvordan React fungerer, og forklarer hva React faktisk gjør på en veldig enkel og grei måte.
- [Den offisielle tutorialen](https://reactjs.org/tutorial/tutorial.html) til React er også en veldig lærerik opplevelse.


### React på 2 minutter (@selbekk - https://github.com/bekk/react-intro)

<details><summary>Klikk her for en rask introduksjon</summary>

React baserer seg på konseptet om at brukergrensesnittet ditt er en funksjon av data. Gitt litt data, så vil React gi deg tilbake det samme brukergrensesnittet. React kaller denne dataen `props` (en forkortelse for properties).

Med andre ord:

```js
brukergrensesnitt = f(props);
```

React baserer seg på at hver bit av brukergrensesnittet ditt er en funksjon. Denne funksjonen tar et objekt med data - `props` - som argument, og returnerer et brukergrensesnitt tilbake. I React kaller man denne typen funksjon for en **komponent**.

En komponent kan se slik ut:

```js
function MinKomponent(props) {
  return <h1>Hei verden</h1>;
}
```

, eller med en annen syntaks for å lage funksjoner:

```js
const MinKomponent = props => {
  return <h1>Hei verden</h1>;
};
```

Synes du den HTML-lignende syntaksen er rar? Det er greit - den _er_ litt rar. Den heter JSX, og er en type XML som React bruker for å beskrive brukergrensesnitt. Man bruker et verktøy som heter [Babel](https://babeljs.io) til å gjøre det om til vanlig JavaScript. JSX er egentlig bare syntaktisk sukker for funksjonen `React.createElement`! Dette er samme komponent som over, i helt vanlig JavaScript:

```js
const MinKomponent = props => {
  return React.createElement('h1', {}, 'Hei verden');
};
```

Du kommer nok sjelden til å skrive kode som dette for hånd, da det å bruke JSX er å foretrekke i så godt som alle situasjoner. Men nå vet du i alle fall hva som egentlig skjer!

Du kan (og bør!) lese mer om JSX i [Reacts dokumentasjon](https://reactjs.org/docs/introducing-jsx.html).

Dette er i svært korte trekk det grunnleggende du trenger å vite om React. I løpet av oppgavene kommer du til å møte på mange flere konsepter, som tilstand (state), sideeffekter og kontekster - men nå vet du i alle fall litt om det mest grunnleggende!

</details>

# Om workshopen

Workshopen består av et sett med oppgaver, som du kan løse lokalt på din egen maskin eller i en CodeSandbox.

## Code sandbox?
(https://codesandbox.io/s/github/bekk/react-intro), så får du opp en moderne kode-editor, en live-oppdatert readme og alt du trenger rett i nettleseren.

**Lokalt**
 `git clone git@github.com:bekk/react-intro.git` => `npm install`=> `npm start` 

Du kommer til å se noen emojis i oppgavene. De betyr ca det her:

- 🏆Oppgave: Her er hva du skal gjøre
- 💡Tips: Litt ekstra info som kan være greit å være for å løse en oppgave
- 🚨Løsningsforslag: Her finner du en komplett gjennomgang av hvordan du _kan_ løse oppgaven

# Oppgaver

Vi skal lage: **Jobbsøk3000**! 🎉

### Oppgave 1: Antall ledige stillinger!

Vi lager en header som inneholder antall stillinger sammen 💑

### Oppgave 2: List ut ledige stillinger!

React er egentlig bare en haug med funksjoner som returnerer JSX. Disse funksjonene kaller vi "komponenter".

🏆 Lag en ny komponent, `<JobList />`, som lister ut ledige stillinger.

> 💡 Her kan du bruke samme fremgangsmåte som i oppgave 1 for å hente data. For å mappe data fra json til JSX bruker man .map på arrayet som kommer fra serveren.
Endepunktet for å hente ledige stillinger finner du på `https://id.jobbnorge.no/api/jobsearch/cached?language=1`

Legg denne også inn i `<App />`-komponenten.

<details><summary>🚨Løsningsforslag</summary>

Uthentingen blir lik som for headeren, bortsett fra endepunktet. Utlistingen kan f.eks gjøres slik:

```js
return (      
        <ul>
            {positions.map(p => (
                <li>
                    <Link to={`/post/${p.id}`}>
                        {p.title} {p.deadline}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
```

</details>

### Oppgave 3: Vis en stillingsannonse

Her har vi plutselig mer enn en side, og må benytte oss av routing.

For å få til routing, kan vi bruke biblioteket `react-router-dom`.  

> 💡 Begynn med å ta en titt på [dokumentasjonen til React Router](https://reacttraining.com/react-router/web/guides/quick-start) for en rask introduksjon til de forskjellige funksjonene du finner der.

🏆 Lag en ny komponent - `JobListing` hvor du viser en stillingsannonse. Her kan du bruke komponenten JobListingComponent.js for å skrive ut komponenter. Den er ikke komplett, men bør gi et minimum for hver stilling i allefall. 

Bruk `BrowserRouter`- og `Route`-komponentene fra `react-router-dom` til å spesifisere URLene de forskjellige sidene skal vises på. `JobList` bør vises på `/`, og `JobListing` bør vises på `/position/:id`.

> 💡 `/position/:id` er en såkalt dynamisk route. Du kan hente ut verdien av `:id` med funksjonen [`useParams()`](https://reacttraining.com/react-router/web/api/Hooks/useparams).

> 💡 Det er litt kinkig at du må hente ut stillingsbeskrivelse for ett bestemt språk. For å komme rundt dette kan du lage en "morsom" 404-side for andre språk enn bokmål, eller du kan lage en fallback. 

<details><summary>🚨Løsningsforslag</summary>

```js
const JobListing = () => {
    
    const { id } = useParams();
    const [position, setPosition] = useState(null);
    
    useEffect(() => {
        const getPos = async () => {
            const response = await fetch(
                `https://id.jobbnorge.no/api/joblisting?jobId=${id}&languageId=1`
            );
            const data = await response.json();
            setPosition(data);
        };
        getPos();
    }, [id]);

    if (!position || !position.components) {
        return <p>This is not the position you are looking for...</p>;
    }

    return (
        <div>
            {position.components.map(c => (
                <Component comp={c} />
            ))}
        </div>
    );
};
```

Her ser du JobListing-komponenten. Legg merke til [id] i useEffect. Det gjør at den kjører når id-parameteren i url-en endrer seg, som igjen gjør at vi henter stillingsinfo når du klikker deg inn på en stilling.

```js
<BrowserRouter>
    <Header /> 
    <Route exact path="/">              
      <JobList />
    </Route>
    <Route exact path="/position/:id">
      <JobListing />
    </Route>
</BrowserRouter>
```

Her er den nye App-komponenten med routing. En side for stillingsliste, og en side for stillingsannonse. Felles header har de også. Snopt.

</details>


## Hva gjør jeg nå?

- Implementer søk i stillingslista.
- Implementer filtrering i stillingslista.
- Lag noe annet gøy.
