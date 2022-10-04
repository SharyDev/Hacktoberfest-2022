#include <iostream>
using namespace std;

int main(){
	int n;
	cin >> n;

	int a[n];
	for(int i=1; i<n; i++){
		cin >> a[i];
	}

	for(int i=0; i<n; i++){
		int current = a[i];
		int prev = i - 1;

		while(prev >= 0 and a[prev] > current){
			a[prev + 1] = a[prev];
			prev -= 1; 
		}
		a[prev + 1] = current;
	}

	for(int i=0; i<n; i++){
		cout << a[i] << " ";
	}
	return 0;
}