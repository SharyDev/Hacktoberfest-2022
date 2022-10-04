#include <iostream>
using namespace std;


template<class T>
class Integer{
	private:
		T Array[2];
		
	public:
		Integer()
		{
			cout<<"Input Value 1: ";
			cin>>Array[1];
			cout<<"\nInput Value 2: ";
			cin>>Array[2];
		}
	T Add()
	{
	
	
		return Array[1]+Array[2];
	}
	
	T Sub()
	{
	
		return Array[1]-Array[2];
	}
	
	T Div()
	{

	
		return Array[1]/Array[2];
	}
	
	T Mul()
	{
	
		return Array[1]*Array[2];
	}
};
int main()
{
	Integer<int> i;
	
	
	cout<<"\nAddition: ";
	cout<<i.Add();
	
	cout<<"\n\nSubtraction:";
	cout<<i.Sub();
	
	cout<<"\n\nDivision:";
	cout<<i.Div();
	
	cout<<"\n\nMultiplication:";
	cout<<i.Mul();
}
