# How to run the project

1. Open 2 terminals and go to the project folder on both terminal.
2. `cd api` in one terminal
3. `cd client` in another
4. `npm i` in both terminals
5. `npm start` in `api` terminal first
6. After it is all good, `npm start` in `client` terminal
7. It should automatically open the app in the browser. If not, go to http://localhost:3000 in you browser.
8. You should see `output` folder created in the root (same level as `api` and `client`), and `results_output.csv` should be in there. I also print the result as list in the UI.

# How to run unit test
1. Assuming you have installed everything and open 2 terminals, in `client` terminal, run `npm test`.

# Drawbacks of the system
1. Probably better to put the merge functionality in the `api` side, but I would like to showcase my react ability, hence I put it in the `client` side
2. Because of no. 1, I have to put `input` folder in `client/src`
3. Can't detect if there is any file changes in `input` folder, so you will need to refresh the page