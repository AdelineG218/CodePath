def find_best_fabric_pair(fabrics, budget):
    mx = -1
    item1 = ""
    item2 = ""
    for i in range(len(fabrics)-1):
        for j in range(i, len(fabrics)):
            temp = fabrics[i][1]+fabrics[j][1]
            if temp <= budget and temp > mx:
                mx = temp
                item1 = fabrics[i][0]
                item2 = fabrics[j][0]
    return (item1, item2)
            

fabrics = [("Organic Cotton", 30), ("Recycled Polyester", 20), ("Bamboo", 25), ("Hemp", 15)]
fabrics_2 = [("Linen", 50), ("Recycled Wool", 40), ("Tencel", 30), ("Organic Cotton", 60)]
fabrics_3 = [("Linen", 40), ("Hemp", 35), ("Recycled Polyester", 25), ("Bamboo", 20)]

print(find_best_fabric_pair(fabrics, 45))
print(find_best_fabric_pair(fabrics_2, 70))
print(find_best_fabric_pair(fabrics_3, 60))
