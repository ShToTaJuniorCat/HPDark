/*
Yes ChatGPT wrote them all (I did some minor changes to some).
We had so much fun together lmao
ChatGPT even randomly said "These are so fun to write!"
I'm proud of myself.
Also yes this was all ChatGPT's idea when I just wrote "surprise me" in a new chat,
and I am soooo down for it.

There's some real deep owl lore in here (in the quotes section, not the facts),
brace yourselves.
*/

// Array of owl facts and funny owl related quotes. Total: 224
const owlStuff = [
    // Facts
    // Yes I did kinda fact check them, but don't trust it with your homework.
    "Owls can rotate their heads 270 degrees!",
    "Owls have 2.5 eyelids: one for sleeping, one for blinking, and almost one for cleaning.",
    "An owl's feathers are so soft that they can fly almost silently.",
    "There are over 200 species of owls in the world.",
    "Owls have excellent night vision and can see in almost complete darkness.",
    "An owl's hearing is incredibly sharp, and they can hear prey moving under the snow.",
    "Owls' eyes are fixed in their sockets; they can't move their eyes but can rotate their heads.",
    "The largest owl is the Blakiston’s fish owl, which can have a wingspan of up to 5.9 feet (1.8 meters).",
    "Owls have asymmetric ears, which helps them locate prey with precision.",
    "Some owls can hunt with their ears alone, relying on sound to locate prey.",
    "Barn owls can eat up to 1,000 mice a year.",
    "The smallest owl is the Elf owl, which is only about 5 inches tall.",
    "An owl’s face is shaped like a disc to help direct sound to its ears.",
    "Owls have specialized feathers that enable them to fly silently and hunt without being heard.",
    "In some cultures, owls are seen as symbols of wisdom or knowledge.",
    "An owl can swoop down and catch a mouse in complete darkness.",
    "Owls can live up to 20 years in the wild, though many don’t make it past their first year.",
    "Owls are carnivores and mainly eat small mammals, birds, and insects.",
    "Owls swallow their prey whole and regurgitate the indigestible parts, like bones and fur, as pellets.",
    "Some owl species are known for their distinctive hoots, which they use to communicate.",
    "Owls’ feathers are designed to be light and fluffy, which helps them stay warm and silent in flight.",
    "The Eurasian eagle owl is one of the largest and most powerful owls, with a wingspan of up to 2 meters.",
    "Some owls are very territorial and usually live alone, while some others may not even fight other owls.",
    "The snowy owl is known for its white feathers that help it blend in with snowy landscapes.",
    "Owls can detect the heat of their prey in the dark using special sensory cells.",
    "Owls are great at hunting in low-light conditions, thanks to their heightened sense of sight and hearing.",
    "Some owls, like the Northern Pygmy Owl, can hunt in the daytime as well as at night.",
    "Owls' sharp talons can easily pierce through the bones of their prey.",
    "A group of owls is called a parliament.",
    "Owls are mostly solitary creatures, except during the mating season or when a mother is caring for her young.",
    "The great horned owl is known for its large tufts, often mistaken for ears, but they’re actually just feathers.",
    "Owls are found on every continent except Antarctica.",
    "Owls have a very strong neck, which helps them turn their heads to extreme angles.",
    "Some owls, such as the burrowing owl, live underground in burrows that they dig or borrow from other animals.",
    "Some owls' diet consists of up to 90% mammals, while others enjoy insects, fish or other birds more.",
    "Unlike hawks or eagles, owls don’t only rely on their exceptional vision to hunt; they also have superior hearing.",
    "Owls are incredibly stealthy hunters, and many of them rely on surprise to catch their prey.",
    "The tawny owl is one of the most common owl species found in Europe.",
    "An owl can fly at speeds of up to 40 miles per hour.",
    "Owls' wings are specially designed to minimize noise while flying, making them excellent stealth hunters.",
    "The barn owl's heart-shaped face helps funnel sound to its ears.",
    "Owls have excellent night vision, which is why they are nocturnal hunters.",
    "The spectral owl, found in Central and South America, has a distinctive scream that sounds like a person wailing.",
    "Owls can move their heads in nearly every direction, up to 270 degrees!",
    "Some owls have dark-colored feathers on their backs to blend in with the environment, making them almost invisible.",
    "Owls use their keen sense of hearing to find prey even when it’s hidden under snow or leaves.",
    "The most commonly heard owl call in North America is the hoot of the great horned owl.",
    "Owls are masters of camouflage, blending into trees, rocks, and other natural surroundings.",
    "In ancient Greece, the owl was the symbol of wisdom and was associated with the goddess Athena.",
    "Owls’ facial discs help funnel sound into their ears, allowing them to hear even the smallest movements.",
    "The short-eared owl is one of the few owl species that hunt during the day.",
    "The long-eared owl has long, pointed feathers on its head that resemble ears, but they aren’t actually ears.",
    "Owls can regurgitate indigestible parts of their prey, typically a few times a day.",
    "We actually don't know how good most owl's sense of smell is They don't seem to care about what we call a bad smell, though.",
    "Despite their reputation for being wise, owls are not as intelligent as many other birds, such as crows or parrots.",
    "Some owls have feathers that look like tufts or horns, adding to their spooky, mythic appearance.",
    "The burrowing owl lives in open fields and grasslands, often near human settlements.",
    "Owls are known for their silent flight, which is attributed to their specialized wing structure.",
    "A common owl in North America is the Eastern Screech Owl, known for its distinctive trilling call.",
    "In some cultures, owls are considered omens of death or misfortune.",
    "The Northern Saw-whet Owl is a small, elusive owl species known for its soft, high-pitched call.",
    "Owls have a specialized bone structure in their necks, allowing them to rotate their heads with ease.",
    "Some owls, like the Barred Owl, may be able to mimic the calls of other animals, such as hawks or other birds.",
    "Owls’ feathers are so soft that they can fly without making a sound, making them stealthy hunters.",
    "Many owls are solitary birds, only interacting with others during mating season.",
    "The Australian Masked Owl has a wide, heart-shaped face that helps it hear its prey.",
    "An owl's talons can be up to two times as strong as those of a hawk.",
    "The Ural Owl, native to Eurasia, has distinctive dark eyes that make it look perpetually surprised.",
    "Owls can live in a variety of habitats, from deserts and forests to wetlands and grasslands.",
    "The Eurasian eagle owl’s call is often described as a deep, booming hoot that can be heard from miles away.",

    // Funny quotes
    "You’re only one hoot away from greatness.",
    "Today’s forecast: 100% chance of feathers.",
    "An owl never reveals its sources. Mostly because they're usually mice.",
    "Take life owl by owl. It’s less overwhelming that way.",
    "Who, who, who… is that in the mirror? Oh, it's you! Looking sharp!",
    "Pro tip: if you can't find an answer, just stare thoughtfully. Works for owls!",
    "You shouldn't fly straight when you can take a stylish swoop.",
    "You look like someone who knows the best places to hoot.",
    "Advice of the day: avoid woodpeckers. Trust me.",
    "If anyone asks, you should say you definitely meant to spin your head like that.",
    "Owls always land on the coolest branches—they have a reputation to maintain.",
    "Hooting at the moon is optional, but highly encouraged.",
    "Owls never rush; a dramatic pause makes everything sound wiser.",
    "Feathers are for flying, fluffing, and occasionally showing off.",
    "Owls can spin their heads around, but they never spin their opinions.",
    "Nighttime is the right time—for snacks and silent swoops.",
    "Owl etiquette: never interrupt another owl’s hoot. It’s rude.",
    "The bigger the eyes, the bigger the secrets they’ve seen.",
    "Owls may be silent, but their stare says it all.",
    "Owl conversations are 80% hoot, 20% head tilt.",
    "You can’t rush wisdom—or a perfect glide.",
    "Always inspect a branch before you perch. Safety first, style second.",
    "The best advice often comes from the owl with the fluffiest feathers.",
    "Owls have a strict policy: no sharing mice unless it’s a special occasion.",
    "Owls blink slowly to show dominance—or just because they’re sleepy.",
    "The fluffier the owl, the wiser it looks. Coincidence? Probably not.",
    "If you think an owl is staring at you, it definitely is.",
    "Every owl’s hoot is unique, like a snowflake, but much louder.",
    "Owls can turn their heads 270 degrees, which is almost enough to avoid awkward questions.",
    "If an owl likes you, it might share its perch. If it doesn’t, you’ll know.",
    "Owls don’t need coffee—they’re naturally nocturnal and naturally majestic.",
    "You’ll never win a staring contest with an owl. Don’t even try.",
    "Owls invented the night shift. They just haven’t filed the patent yet.",
    "An owl in flight is like a whisper on the wind. A very feathery whisper.",
    "Always bring a snack when flying long distances. Nobody likes a(n) (h)angry owl.",
    "Branch inspection is not optional. A wobbly perch can ruin your whole evening.",
    "A good preening session is the key to confidence.",
    "Owls don’t rush; every swoop deserves style points.",
    "Sunbathing is fine, but avoid direct sunlight—it’s bad for the mystique.",
    "The best way to eavesdrop is to pretend you’re asleep. Owls are experts.",
    "Never hoot over someone else’s hoot. It’s bad form.",
    "If you miss your prey, just say it was a practice dive.",
    "Feathers are for warmth, flight, and dramatic entrances. Use them wisely.",
    "When in doubt, tilt your head. It works 99% of the time.",
    "An owl never forgets. It just pretends to for dramatic effect.",
    "The more mysterious you are, the more impressive your hoot sounds.",
    "A wise owl knows that sometimes the best answer is just to fly away.",
    "Always look before you swoop—it saves embarrassment later.",
    "Owls see everything, but they only talk about the interesting bits.",
    "The darker the night, the brighter your feathers shine (metaphorically speaking).",
    "Patience isn’t just a virtue—it’s a hunting strategy.",
    "Owls don’t argue; they just hoot louder until they win.",
    "The best way to solve a problem is to stare at it until it goes away.",
    "Sometimes, the wisest choice is a quiet hoot and a tactical retreat.",
    "Owls invented the silent treatment, but they’ll never admit it.",
    "Flying is 10% flapping and 90% dramatic flair.",
    "If an owl winks at you, it’s either a good sign or a trick—proceed cautiously.",
    "Owls believe that moonlight is their spotlight.",
    "Every owl has a favorite tree, and no, they won’t tell you which one it is.",
    "The fluffiest owl gets the best nest—this is an unspoken rule of the forest.",
    "Owls are surprisingly good at hide-and-seek, mostly because they don’t play fair.",
    "Owls don’t need maps; they just wing it.",
    "A well-timed hoot can fix almost anything.",
    "You can measure an owl’s mood by the tilt of its head.",
    "Owls secretly think they’re better than other birds, and they’re not entirely wrong.",
    "It’s not the size of the talons—it’s how you use them.",
    "Owls hate alarm clocks; they consider them unnecessary competition.",
    "An owl’s greatest fear is a windy day with no trees in sight.",
    "Owls don’t hoard—they just have an ‘extensive collection’ of twigs and fluff.",
    "The moon is an owl’s best friend and occasional confidant.",
    "Every owl has a signature hoot. It’s their calling card.",
    "Owls believe that stars are just shiny feathers lost in the sky.",
    "The best naps are taken with one eye open—just in case.",
    "Owls consider dawn a personal insult.",
    "Owls don’t get lost; they just take scenic detours.",
    "An owl never misses a chance to look majestic, even if it’s falling off a branch.",
    "Every owl has a secret dance move, but they only perform it under the full moon.",
    "If an owl fluffs its feathers, it’s either cold or showing off. Probably both.",
    "Owls don’t play favorites, but they might have a soft spot for whoever hoots first.",
    "The best conversations happen at midnight. Owls made sure of it.",
    "You can’t bribe an owl, but you can win its respect with a really good mouse.",
    "Owls love a good mystery, especially if it involves squeaky noises in the dark.",
    "If an owl gives you side-eye, you’re probably in trouble.",
    "Every owl secretly wishes it had glow-in-the-dark feathers.",
    "A well-preened feather is worth a thousand words.",
    "You can judge an owl by its talons, but only at your own risk.",
    "Owls invented wing warmers, but they call them feathers.",
    "A stylish owl always leaves a little sparkle—metaphorically, of course.",
    "Hats are unnecessary when you have perfect head fluff.",
    "Owls believe in natural beauty, but they still spend hours perfecting their look.",
    "The secret to a great swoop? Confidence and a good tailwind.",
    "No two feathers are alike—just like no two owls are equally fabulous.",
    "If you see an owl with its feathers ruffled, offer it a compliment immediately.",
    "The best-dressed owl is the one with a moonlit glow.",
    "Every flight is a chance for an adventure—or at least a snack.",
    "Owls have a sixth sense for finding the coziest hollow trees.",
    "Exploring is best done with silent wings and a dramatic entrance.",
    "The farther you fly, the sweeter the hoot when you return.",
    "Owls don’t need maps—they navigate by sheer determination and a little luck.",
    "Every owl has a favorite star, but they’ll never tell you which one.",
    "Owls always know where north is, but they prefer to go wherever looks interesting.",
    "An owl’s journey is measured not in miles, but in memories (and mice).",
    "Sometimes, the best adventures are just a new branch with a better view.",
    "Owls think of rain as nature’s way of helping them look even fluffier.",
    "Owls are part of every secret society, but they never RSVP.",
    "Legends say owls invented the first hoot to confuse humans. It worked.",
    "Owls consider themselves keepers of ancient knowledge, but most of it is about snacks.",
    "The first owl to hoot at the moon started a tradition that continues to this day.",
    "Some say owls whisper to the stars. The stars haven’t denied it.",
    "Every owl knows the secret of the universe, but they refuse to share because it’s funnier that way.",
    "Owls are rumored to control the tides, but they’d rather you didn’t know.",
    "An owl’s stare can uncover truths you didn’t even know you were hiding.",
    "Owls were here long before the trees—they just waited for the perfect perch.",
    "If you hear an owl laugh, it’s probably at a joke only owls understand.",
    "Owls are said to be the first creatures to see the stars—long before anyone thought to name them.",
    "Legend has it that owls once spoke every language, but they gave it up for the perfect hoot.",
    "The Great Parliament of Owls gathers once a century to decide the fate of the night sky.",
    "Owls were entrusted with guarding the Moon’s secrets, and they’ve never spilled a word… or a feather.",
    "It’s whispered that owls taught the wind to whistle—just to make flying more enjoyable.",
    "The first owl discovered fire, but they decided it wasn’t worth the risk to their feathers.",
    "Owls claim to have invented dusk, but they’re still debating who thought of dawn.",
    "There’s an ancient owl legend about the ‘Hootless One,’ a silent owl who carried infinite wisdom.",
    "Owls once ruled the skies unchallenged—until they graciously allowed other birds to exist.",
    "In the Time Before Branches, owls perched on the very edges of the world.",
    "Owls can hear whispers from across a forest, but they only listen to the interesting ones.",
    "They say owls can see your dreams, but they prefer to keep them a mystery.",
    "An owl’s wings can stir the air just enough to change the course of a storm.",
    "The shadow of an owl is said to bring wisdom—or at least a moment of quiet contemplation.",
    "Owls can navigate by starlight, moonlight, and the occasional reflective pond.",
    "A single owl feather holds the memory of every place it has flown.",
    "Owls don’t sleep—they enter a trance where they observe the world’s secrets in silence.",
    "The hoot of an owl can echo forever if it’s perfectly timed.",
    "Owls have an uncanny ability to know when someone needs a little guidance, or just a good hoot.",
    "An owl’s stare can freeze time, but they rarely use it because it’s impolite.",
    "The ‘Feathered Council’ decides the color of the autumn leaves every year.",
    "Some owls belong to the ‘Order of Silent Wings,’ dedicated to mastering noiseless flight.",
    "There’s a myth about the ‘Eclipse Owl,’ whose hoot signals the start of great changes.",
    "The ‘Twilight Accord’ is an ancient pact between owls and the stars to keep the night peaceful.",
    "Owls have a secret archive of all the world’s forgotten stories. It’s hidden in a tree no one can find.",
    "The oldest owl alive is said to live on a mountain where the moon touches the earth.",
    "Owls once hosted the first ‘Night of a Thousand Hoots,’ a festival that echoed through the ages.",
    "The ‘Moonlit Conclave’ is an annual gathering where owls vote on the best hoot of the year.",
    "Owls claim credit for teaching the wolves to howl—purely to complement their hoots.",
    "Every owl dreams of being invited to the ‘Hollow Tree,’ the most exclusive nest in the forest.",
    "Owls were the first to chart the constellations, though their maps were only understood by other owls.",
    "They say the Milky Way is a path of feathers left by an ancient owl flying through the cosmos.",
    "An owl’s hoot can align the stars, though they rarely do it because it’s a lot of responsibility.",
    "Owls believe the moon is their guardian and the sun their occasional rival.",
    "The Northern Lights are rumored to be the reflection of an owl’s wings as it glides through the sky.",
    "Some owls claim they’re descended from celestial beings who came to earth to guide the night.",
    "There’s a story that the first owl flew to the moon and brought back its glow to share with the world.",
    "Owls watch the stars not to navigate, but to remember where they’ve been.",
    "Every full moon, the ‘Sky Owls’ perform a secret dance that keeps the universe in balance.",
    "It’s said that an owl’s stare can see beyond the stars—into the very fabric of time."
    ];


// Function to set today's owl fact
function setTodaysOwlFact() {
    // Pick a random fact
    const randomFact = owlStuff[Math.floor(Math.random() * owlStuff.length)];
    // Update the span with the random fact
    document.getElementById('owlsInsight').textContent = randomFact;
}

// Set the fact when the page loads
document.addEventListener('DOMContentLoaded', setTodaysOwlFact);